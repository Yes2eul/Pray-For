const getTimeDifference = (timestamp) => {
  const currentTime = new Date();
  const postTime = new Date(timestamp);
  const timeDifference = Math.floor((currentTime - postTime) / 1000);

  if (timeDifference < 60) {
    return "방금 전";
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)}분 전`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)}시간 전`;
  } else if (timeDifference < 2592000) {
    return `${Math.floor(timeDifference / 86400)}일 전`;
  } else if (timeDifference < 31536000) {
    return `${Math.floor(timeDifference / 2592000)}달 전`;
  } else {
    return `${Math.floor(timeDifference / 31536000)}년 전`;
  }
};

export default getTimeDifference;
