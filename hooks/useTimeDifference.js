const useTimeDifference = (timestamp) => {
  const currentTime = new Date();
  const postTime = timestamp.toDate();
  const timeDifference = Math.floor((currentTime - postTime) / 1000);

  if (timeDifference < 60) {
    return "방금 전";
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)}분 전`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)}시간 전`;
  } else {
    return postTime.toLocaleString();
  }
};

export default useTimeDifference;
