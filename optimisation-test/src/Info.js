// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

const Info = ({isAccepted, isSigned, isSealed, approved}) => {
  const isDelivered = isAccepted && isSigned && isSealed && approved === 'approved';
  // const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   setShowMessage(isDelivered);
  // }, [isDelivered]);

  return (
    <span>Info: {isDelivered ? "Delivered" : "Undelivered" }</span>
  );
}

export default Info;