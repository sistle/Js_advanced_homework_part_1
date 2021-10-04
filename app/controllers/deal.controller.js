const Deal = require("../models/deal.model.js");


exports.create = (req, res) => {

	if (!req.body) {
		res.status(400).send({
			message: "У нас не може не бути даних"
		});
	}



	const deal = new Deal({
		text: req.body.text,
	});


	Deal.create(deal, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Виникла помилка під час виконання коду"
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Deal.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Щось пішло не так під час отримання інформації про всіх клієнтів"
			});
		else
			res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
		res.send(data);
		res.send(req.params.dealId);
	});
};

exports.findOne = (req, res) => {
	Deal.findById(req.params.dealId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Нема данних  з id ${req.params.dealId}.`
				});
			} else {
				res.status(500).send({
					message: "Проблема з отриманням користувача з id " + req.params.dealId
				});
			}
		} else res.send(data);
	});
};


exports.update = (req, res) => {

	if (!req.body) {
		res.status(400).send({
			message: "Контент не може бути пустим"
		});
	}

	Deal.updateById(
		req.params.dealId,
		new Deal(req.body),
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Не знайдено інформації  по id ${req.params.dealId}.`
					});
				} else {
					res.status(500).send({
						message: "Error updating deal with id " + req.params.dealId
					});
				}
			} else res.send(data);
		}
	);
};


exports.delete = (req, res) => {
	Deal.remove(req.params.dealId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Не знайдено інформації  по id ${req.params.dealId}.`
				});
			} else {
				res.status(500).send({
					message: "Не можна видалити інформацію по id " + req.params.dealId
				});
			}
		} else res.send({ message: `інформація успішно видалена` });
	});
};


exports.deleteAll = (req, res) => {
	Deal.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Щось пішло не так під час видалення всіх даних"
			});
		else res.send({ message: `Вся інформація успішно видалена` });
	});
};
