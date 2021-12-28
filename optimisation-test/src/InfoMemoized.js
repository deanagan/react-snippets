// eslint-disable-next-line no-unused-vars
import { useEffect, useMemo, useState } from "react";

const InfoMemoized = ({isAccepted, isSigned, isSealed, approved}) => {
  const isDelivered = useMemo(() => isAccepted && isSigned && isSealed && approved === 'approved', [isAccepted, isSigned, isSealed, approved]);
  // const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   setShowMessage(isDelivered);
  // }, [isDelivered]);

  return (
    <span>Info Memoized: {isDelivered ? "Delivered" : "Undelivered" }</span>
  );
}

export default InfoMemoized;