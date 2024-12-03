export const notFound = (req, res) => {
    res.status(404).json({ status: false, msg: "Page not found" })
}

export const errorHandle = (err, req, res, next)  => {
    console.log(err);
    res.status(500).json({ status: false, msg: "Internal server error" })
}
