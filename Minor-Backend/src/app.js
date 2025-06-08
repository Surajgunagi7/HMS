import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}))
app.use(express.static("public"))



app.get("/", (req, res) => {
    res.send("Hospital Management System Backend");
});

import userRouter from './routes/user.route.js'
import patientRouter from './routes/patient.route.js'
import appointmentRouter from './routes/appointment.route.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/patients", patientRouter)
app.use("/api/v1/appointments", appointmentRouter)


export { app }
