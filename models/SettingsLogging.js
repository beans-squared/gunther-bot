module.exports = (sequelize, DataTypes) => {
	return sequelize.define('settings_logging', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		logChannel: {
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};