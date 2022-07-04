module.exports = (sequelize, DataTypes) => {
	return sequelize.define('invite', {
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			default: 'New Invite',
		},
		uses: {
			type: DataTypes.INTEGER,
			default: 0,
		},
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};