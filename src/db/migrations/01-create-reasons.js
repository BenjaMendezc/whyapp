'use strict'

module.exports = {
	up: (queryInterface, Sequelize) =>{
		return queryInterface.createTable('Reasons', {
			id:{
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			value:{
				type: Sequelize.TEXT,
				allowNull:false,
			},
		    createdAt: {
		      type: Sequelize.DATE,
		      allowNull: false,
		      defaultValue: Sequelize.fn('NOW')
		    },
		    updatedAt: {
		      type: Sequelize.DATE,
		      allowNull: false,
		      defaultValue: Sequelize.fn('NOW')	
		    }		
		});
	},

	down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reasons');
  }
};