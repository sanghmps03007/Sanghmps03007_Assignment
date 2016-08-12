/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*******************************************************************************
 * Implementation code for procedure - 'procedure1'
 * 
 * 
 * @return - invocationResult
 */
 
var procedure1Statement = WL.Server.createSQLStatement("select * from sanpham");
function getMobileAdaptersSanPham() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : []
	});
}


/*******************************************************************************
 * Implementation code for procedure - 'procedure2'
 * 
 * 
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}


/*******************************************************************************
 * Functions that correspond to JSONStore client operations
 * 
 */

var selectStatement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1");

function getMobileAdapters() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : []
	});
}

var selectItemStatement = WL.Server.createSQLStatement("select * from sanpham where MaSP=?");

function getItemMobileAdapters(MaSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectItemStatement,
		parameters : [MaSP]
	});
}

var addStatement = WL.Server.createSQLStatement("insert into sanpham (MaSP, idLoai, TenSP, NhaSX, Gia, Images) values (?, ?, ?, ?, ?, ?)");

function addMobileAdapter(MaSP, idLoai, TenSP, NhaSX, Gia, Images) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [MaSP, idLoai, TenSP, NhaSX, Gia, Images]
	});
}
	
var updateStatement = WL.Server.createSQLStatement("update sanpham set Images =?, idLoai=?, TenSP=?, NhaSX=?, Gia=? where MaSP=?");

function updateMobileAdapter(Images, idLoai, TenSP, NhaSX, Gia, MaSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [Images, idLoai, TenSP, NhaSX, Gia, MaSP]
	});
}

var deleteStatement = WL.Server.createSQLStatement("delete from sanpham where MaSP=?");

function deleteMobileAdapter(MaSP) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [MaSP]
	});
}
//------------------------------------------
var selectStatementLogin = WL.Server.createSQLStatement("select * from user");

function getMobileAdaptersLogin() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatementLogin,
		parameters : []
	});
}

var addStatementLogin = WL.Server.createSQLStatement("insert into user (username, password, role) values (?, ?, ?)");

function addMobileAdapterLogin(username, password, role) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatementLogin,
		parameters : [username, password, role]
	});
}
	
var updateStatementLogin = WL.Server.createSQLStatement("update user set password=?, role=? where username=?");

function updateMobileAdapterLogin(password, role, username) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatementLogin,
		parameters : [password, role, username]
	});
}

var deleteStatementLogin = WL.Server.createSQLStatement("delete from user where username=?");

function deleteMobileAdapterLogin(username) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatementLogin,
		parameters : [username]
	});
}
var loginStatement = WL.Server.createSQLStatement("select * from user where username=? and password=?");
function LoginUser(username,password){
	return WL.Server.invokeSQLStatement({
		preparedStatement : loginStatement,
		parameters : [username,password]
	});
}
