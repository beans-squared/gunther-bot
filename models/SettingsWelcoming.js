module.exports = (sequelize, DataTypes) => {
	return sequelize.define('settings_welcoming', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		channel_id: {
			type: DataTypes.STRING,
		},
		message: {
			type: DataTypes.TEXT,
			defaultValue: 'Hello, %MEMBER_NAME%! Welcome to %GUILD_NAME%.',
		},
	}, {
		timestamps: false,
	});
};