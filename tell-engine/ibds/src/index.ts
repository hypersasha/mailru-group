import app from "./NetworkLayer";
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Jeoparty server started on port " + PORT);
});