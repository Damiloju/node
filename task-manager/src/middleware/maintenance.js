const maintenance = (req, res, next) => {
    res.status(503).send('Application is undergoing maintenance');
};

module.exports = maintenance;