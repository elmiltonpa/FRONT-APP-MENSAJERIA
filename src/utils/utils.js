

const getOtherUser = (chatInfo, currentUsername) => {
    return chatInfo.users.find(user => user.username !== currentUsername).username
    
}

export { getOtherUser };