module.exports = (sequelize, DataTypes) => {
	return sequelize.define('role_menu', {
		menu_title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		channel_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		message_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};