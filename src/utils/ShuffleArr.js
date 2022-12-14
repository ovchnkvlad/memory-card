const getShuffleArr = (arr) => {
    return arr.concat(arr).sort(() => Math.random() - 0.5)
}

export default getShuffleArr;