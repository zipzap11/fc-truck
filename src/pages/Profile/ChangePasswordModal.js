import React, { useState } from "react";
import Modal from "../../components/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import ReloginModal from "./ReloginModal";

const ChangePasswordModal = (props) => {
  const [reLogin, setReLogin] = useState(false);

  return (
    <Modal onClick={props.onClose}>
      {reLogin && <ChangePasswordForm onClose={props.onClose} />}
      {!reLogin && (
        <ReloginModal setReLogin={setReLogin} onClose={props.onClose} />
      )}
    </Modal>
  );
};

export default ChangePasswordModal;
