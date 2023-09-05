const getHostList = () => {
    return $axios({
        url: `/host`,
        method: 'get'
    })
}