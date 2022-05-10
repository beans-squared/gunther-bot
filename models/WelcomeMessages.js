module.exports = (sequelize, DataTypes) => {
	return sequelize.define('welcomemessages', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		message: {
			type: DataTypes.TEXT,
			defaultValue: 'Hello, %MEMBER_NAME%! Welcome to %GUILD_NAME%.',
		},
	}, {
		timestamps: false,
	});
};