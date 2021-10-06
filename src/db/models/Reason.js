module.exports = (sequelize, DataTypes)=>{
	const Reasons = sequelize.define('Reasons', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true			
		},
		value:{
		type: DataTypes.TEXT,
		allowNull:false,
		},
		createdAt: {
		  type: DataTypes.DATE,
		  allowNull: false,
		  defaultValue: sequelize.fn('NOW')
		},
		updatedAt: {
		  type: DataTypes.DATE,
		  allowNull: false,
		  defaultValue: sequelize.fn('NOW')	
		}	
	});

	return Reasons
};