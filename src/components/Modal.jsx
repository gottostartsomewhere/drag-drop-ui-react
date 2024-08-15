import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = ({ card, onClose }) => {
  return (
    <AntdModal
      title={`Card No.${card.id}`}
      visible={!!card}
      onCancel={onClose}
      footer={null}
    >
      <p>{card.text}</p>
    </AntdModal>
  );
};

export default Modal;

