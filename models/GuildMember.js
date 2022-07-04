module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guild_member', {
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		xp: {
			type: DataTypes.INTEGER,
			default: 0,
		},
	}, {
		timestamps: false,
	});
};