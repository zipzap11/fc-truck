import React from "react";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import loader from "./Loader.module.css";
import SuccessModal from "./SuccessModal";

const ChangeProfileModal = (props) => {
  return (
    <Modal>
      {props.isLoading && <Loading className={loader.loader} />}
      {!props.isLoading && (
        <SuccessModal onClose={props.onClose}>{props.content}</SuccessModal>
      )}
    </Modal>
  );
};

export default ChangeProfileModal;
