const express = require("express");
const KoderUseCase = require("../usecases/koders.usecase");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const allKoders = await KoderUseCase.getAll();
        response.json({
          message: "Koders List",
          data: {
            koders: allKoders,
          },
        });
    } catch(error) {
        response.status(500);
        response.json({
            message: "something went wrong",
            error: error.message,
        });
    }
});

router.get("/:id", async (request, response) => {
  try {
    const kodersById = await KoderUseCase.getById(request.params.id);
    response.json({
      message: "Koder",
      data: {
        koders: kodersById,
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
    const koderCreate = await KoderUseCase.create(request.body);
    response.status(201);
    response.json({
      message: "koder creado",
      data: {
        koder: koderCreate,
      },
    });
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    const keys = Object.keys(error.errors);
    const errorValues = Object.entries(error.errors).reduce((accum, current, index) => {
      return [...accum, {key: keys[index], message:current[1].message}]
    },[]);
    response.status(status);
    response.json({
      message: "something went wrong",
      error: errorValues,
    });
  }
});

router.delete("/:id", async (request, response) => {
    try {
        const koder = await KoderUseCase.deleteById(request.params.id);
        response.json({
          message: "Koder deleted correctly",
          data: koder,
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "something went wrong",
            error: error.message,
        });
    }
});

router.patch("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const koderUpdated = await KoderUseCase.updateKoder(id, request.body);
        response.json({
            message: "Koder updated",
            data: {
                koder: koderUpdated,
            },
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: "something went wrong",
            error: error.message,
        });
    }
});

module.exports = router;
