import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  }
  const createModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  }
  const deleteModule = (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = dao.deleteModule(courseId, moduleId);
    res.send(status);
  }
  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, moduleUpdates);
    res.send(status);
  }
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModulesForCourse);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
}