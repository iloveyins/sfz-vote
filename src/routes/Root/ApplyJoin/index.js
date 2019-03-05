export default {
    path: '/applyJoin/:id',
    async getComponent(location, callback) {
        import ('../../../pages/ApplyJoin').then(module => callback(null, module.default));
    }
}