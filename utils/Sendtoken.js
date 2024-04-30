exports.sendtoken = (student, statuscode, res) => {
    const token = student.getjwttoken();
    res.json({token});
};