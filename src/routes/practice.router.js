const express = require("express");
const PracticeUseCase = require("../usecases/practice.usecase");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const allPractices = await PracticeUseCase.getAll();
        response.json({
            message: "Practices list",
            data: {
                practices: allPractices,
            }
        })
    } catch (error) {
        response.status(500);
        response.json({
            message: "something went wrong",
            error: error.message,
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const practiceId = request.params.id;
        const practiceById = await PracticeUseCase.getById(practiceId);
        response.json({
            message: "practice",
            data: {
                practice: practiceById,
            },
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "Something went wrong",
            error: error.message,
        });
    }
});

router.post("/", async (request, response) => {
    try {
        const practiceCreated = await PracticeUseCase.create(request.body);
        response.status(201);
        response.json({
            message: "practice creado",
            data: {
                practice: practiceCreated
            },
        });
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : error.status;
        let errorValues;
        if(error.errors === undefined) {
            errorValues = error.message;
        } else {
            const keys = Object.keys(error.errors);
            errorValues = Object.entries(error.errors).reduce((accum, current, index) => {
                return [...accum, {key: keys[index], message:current[1].message}];
            },[]);
        }
        response.status(status);
        response.json({
            message: "something went wrong",
            error: error
        });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const practiceId = request.params.id;
        const practice = await PracticeUseCase.deleteById(practiceId);
        response.json({
            message: "practice deleted correctly",
            data: {
                practice: practice,
            },
        })
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "something went wrong",
            error: error.message
        });
    }
});

router.patch("/:id", async (request,response) => {
    try {
        const { id } = request.params;
        const practiceUpdated = await PracticeUseCase.updateById(id, request.body);
        response.json({
            message: "practice updated",
            data: {
                practice: practiceUpdated,
            },
        })
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : error.status;
        const keys = Object.keys(error.errors);
        const errorValues = Object.entries(error.errors).reduce((accum, current, index) => {
            return [...accum, {key: keys[index], message:current[1].message}];
        },[]);
        response.status(status);
        response.json({
            message: "Something went wrong",
            error: errorValues,
        });
    }
});

module.exports = router;