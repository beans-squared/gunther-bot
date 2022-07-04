module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		timestamps: false,
	});
};