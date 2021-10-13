import React, { useRef, useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import classes from "./OrderForm.module.css";
import { db } from "../../db/firebase";
import UserContext from "../../store/user-context";
import { useCart } from "../../store/cart-context";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const OrderForm = (props) => {
  const data = props.data;
  const ongkir = props.amount * 100000;
  const total = props.total + ongkir;
  // hook start
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const userCtx = useContext(UserContext);
  const cartCtx = useCart();
  const {
    input: addressInput,
    inputIsValid: addressIsValid,
    inputIsInvalid: addressIsInvalid,
    onChangeInputHandler: onChangeAddressHandler,
    onBlurInputHandler: onBlurAdressHandler,
    resetInput: resetAddressInput,
  } = useInput((value) => value.trim().length > 0);
  const paymentMethodRef = useRef();
  const promoCodeRef = useRef();
  const dateInputRef = useRef();
  // hook end

  // function
  const generateOrderId = async () => {
    console.log("GENERATING OID");
    let oid = userCtx.uid;
    let postfixUnique = 0;
    let data = await db.collection("orders").doc(userCtx.uid).get();
    if (data.exists) {
      console.log("EXIST");
      postfixUnique = Object.keys(data.data()).length;
      return { oid: oid + "." + postfixUnique, postfix: postfixUnique };
    } else {
      console.log("NOT EXIST");
      return { oid: oid + "." + 0, postfix: postfixUnique };
    }
  };
  const resetInput = () => {
    resetAddressInput();
    paymentMethodRef.current.value = "";
    promoCodeRef.current.value = "";
    dateInputRef.current.value = "";
  };
  // function end

  // handler function
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = (func) => {
    if (success) {
      cartCtx.resetCart();
    }
    setIsModalOpen(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    onBlurAdressHandler();
    if (addressIsValid) {
      setIsLoading(true);
      openModalHandler();
      let promo = promoCodeRef.current.value;
      let { oid: orderId, postfix } = await generateOrderId();
      console.log("POSTFIX :", postfix);
      console.log("ORDER ID", orderId);
      if (promo.length === 0) promo = 0;
      const data = {
        [orderId]: {
          name: userCtx.name,
          uid: userCtx.uid,
          email: userCtx.email,
          phone: userCtx.phone,
          address: addressInput,
          payment: paymentMethodRef.current.value,
          orderId: orderId,
          promo: promoCodeRef.current.value,
          date: dateInputRef.current.value,
          stampId: postfix,
          items: cartCtx.items,
          price: cartCtx.price,
        },
      };
      console.log("DATA :", data);
      db.collection("orders")
        .doc(userCtx.uid)
        .set(data, { merge: true })
        .then((res) => {
          console.log("SUCESS");
          setError(false);
          setIsLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          console.log("ERROR");
          setError(true);
          setIsLoading(false);
          setSuccess(false);
        });
      resetInput();
    }
  };
  // handler function end

  // sub component
  console.log("------------MODAL IS OPEN ?", isModalOpen);

  const ConfirmModal = () => {
    return (
      <Modal onClick={closeModalHandler}>
        {isLoading && <Loading className={classes.loader} />}
        {!isLoading && !error && (
          <div className={classes.success}>
            <i className={`fas fa-check-circle ${classes.check}`}></i>
            <h3>Payment Complete !</h3>
            <p className={classes.more}>(more details on History page)</p>
            <div>
              <button className={classes.close} onClick={closeModalHandler}>
                Close
              </button>
              <Link
                className={classes.goto}
                onClick={() => cartCtx.resetCart()}
                to="/history"
              >
                Go to History page <i className="fas fa-angle-double-right"></i>
              </Link>
            </div>
          </div>
        )}
        {!isLoading && error && (
          <div className={classes.failed}>
            <p>Something went wrong, try again!</p>
            <button className={classes.close} onClick={closeModalHandler}>
              Close
            </button>
          </div>
        )}
      </Modal>
    );
  };
  // sub component end
  return (
    <div className={classes["order-detail"]}>
      {isModalOpen && <ConfirmModal />}
      <h2>Payment Details</h2>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="tujuan">Tujuan</label>
          <input
            type="text"
            value={addressInput}
            onChange={onChangeAddressHandler}
            onBlur={onBlurAdressHandler}
            placeholder="Masukkan alamat tujuan"
          />
          {addressIsInvalid && (
            <p className={classes["invalid-input"]}>Thi field can't be empty</p>
          )}
        </div>
        <div className={classes.control}>
          <label>Time order</label>
          <input
            ref={dateInputRef}
            className={classes.date}
            type="text"
            placeholder="Format : (dd-mm-yyyy) - (hour interval) <> i.e (18-06-2021) - (12:00 - 17:00)"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="tujuan">Metode Pembayaran</label>
          <select ref={paymentMethodRef}>
            <option>OVO</option>
            <option>Gopay</option>
            <option>BCA</option>
            <option>PayPal</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="tujuan">Promo</label>
          <input
            type="text"
            ref={promoCodeRef}
            placeholder="Masukkan kode promo"
          />
        </div>

        {props.data.length > 0 && props.uid && (
          <div className={classes.summary}>
            <h4>Ringkasan Pesanan</h4>
            <ul>
              {data &&
                data.map((data) => {
                  return (
                    <li className={classes.item} key={data.id}>
                      <p>
                        {data.name} ({data.amount}x)
                      </p>
                      <p>
                        Rp. {props.rupiahFormat(data.price, data.amount)},00
                      </p>
                    </li>
                  );
                })}
            </ul>

            <>
              <div className={classes.subtotal}>
                <p>Total Harga</p>
                <p>Rp. {props.rupiahFormat(props.total)},00</p>
              </div>
              <div className={classes.ongkir}>
                <p>Biaya Pengiriman</p>
                <p>Rp. {props.rupiahFormat(ongkir)},00</p>
              </div>
              <div className={classes.total}>
                <p>TOTAL</p>
                <p>Rp. {props.rupiahFormat(total)},00</p>
              </div>
              <div className={classes.action}>
                {addressIsInvalid && (
                  <p className={classes["invalid-input-below"]}>
                    Your payment details is Incomplete !
                  </p>
                )}
                <button className={classes.submit}>Confirm</button>
              </div>
            </>
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
