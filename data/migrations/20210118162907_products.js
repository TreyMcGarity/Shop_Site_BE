
exports.up = async function(knex) {
	return knex.schema.createTable("product", (tbl) => {
		tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
		tbl.string("name", 20).notNull();
		tbl.string("category", 20).notNull();
		tbl.string("details");
        tbl.integer("cost").notNull();
        tbl.integer("stock");
		tbl.string("product_pic_id");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
	});
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("product");
};

