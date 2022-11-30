const ProjectSettings = {
    width: 1500,
    height: 900,
    frameRate: 60,

    centerX(forItemWidth = 0) {
        return ProjectSettings.width / 2 - forItemWidth / 2;
    },

    centerY(forItemHeight = 0) {
        return ProjectSettings.height / 2 - forItemHeight / 2;
    },
};

export default ProjectSettings;