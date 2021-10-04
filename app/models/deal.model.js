const sql = require("./db.js");


const Deal = function (deal) {
	this.text = deal.text;
	this.id = deal.id;
};


Deal.create = (newDeal, result) => {

	const queryInsert = "INSERT INTO TODO SET ?";
	sql.query(queryInsert, newDeal, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		console.log("Створено справу ", { id: res.insertId, ...newDeal });
		result(null, { id: res.insertId, ...newDeal });
	});
};


Deal.findById = (dealId, result) => {
	const queryFintbyId = `SELECT * FROM TODO WHERE id = '${dealId}'`;
	sql.query(queryFintbyId, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("найдено справу: ", res[0]);
			result(null, res[0]);
			return;
		}

		result({ kind: "not_found" }, null);
	});
};

Deal.getAll = result => {
	const queryAll = "SELECT text, id FROM TODO";
	sql.query(queryAll, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("deals: ", res);
		result(null, res);
	});
};


Deal.updateById = (id, deal, result) => {
	const queryUpdate = "UPDATE TODO SET text = ?  WHERE id = ?";
	sql.query(
		queryUpdate,
		[deal.text, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("Обновлено дело ", { id: id, ...deal });
			result(null, { id: id, ...deal });
		}
	);
};



Deal.remove = (id, result) => {
	const queryDelete = "DELETE FROM TODO WHERE id = ?";
	sql.query(queryDelete, id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			result({ kind: "не знайдено" }, null);
			return;
		}

		console.log("Видалений користувач з id ", id);
		result(null, res);
	});
};

Deal.removeAll = result => {
	sql.query("DELETE FROM TODO", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} deals`);
		result(null, res);
	});
};

module.exports = Deal;
