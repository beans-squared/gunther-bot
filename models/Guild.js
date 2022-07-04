module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guild', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		timestamps: false,
	});
};