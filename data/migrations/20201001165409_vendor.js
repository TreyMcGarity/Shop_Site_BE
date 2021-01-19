
exports.up = function(knex) {
	return knex.schema.createTable("vendor", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.string("first_name", 20).notNull();
		tbl.string("last_name", 20).notNull();
		tbl.string("email").unique();
		tbl.bigInteger("phone", 10).unique();
		tbl.date("dob");
		tbl.string("password").notNull();
		tbl.string("profile_pic_id");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("last_logged_in");
		tbl.string("gender");
		tbl.boolean("registration_complete").notNull().defaultTo(true);
		tbl.string("user_type").notNull().defaultTo("vendor");
	});
};

exports.down = function(knex) {
    await knex.schema.dropTableIfExists("vendor");
};
