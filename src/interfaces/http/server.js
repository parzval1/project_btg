module.exports = {
    start: () => {
        const PORT = process.env.PORT || 3000;

        const app = require('./router');

        app.listen(PORT, () => console.log(`server is listening on port  ${PORT}`));

        return app;
    },
};
