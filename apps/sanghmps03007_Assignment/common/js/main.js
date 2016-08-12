var busyIndicator = null;
var role = "";

function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	busyIndicator = new WL.BusyIndicator(null,{text:'Đang Kiểm Tra Dữ Liệu...'});
	//busyIndicator = new WL.BusyIndicator('XemSvAd');
	$('#btn-login').click(busyIndicatorDemo);
	loadFeedsXem();
	loadFeedsLogin();
	loadFeeds();
	//loadFeedsXem2();
}
//------------------SVUser********************************
function busyIndicatorDemo(){
	busyIndicator.show();
	setTimeout(function(){
		busyIndicator.hide();
		LoginUser();
	},2000);
}

function loadFeedsXem(){
	//WL.Client.reloadApp();
	busyIndicator.show();
	
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'getMobileAdaptersSanPham',
			parameters : []
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessXem,
		onFailure : loadFeedsFailureXem
	});
}

function loadFeedsSuccessXem(result){
	WL.Logger.debug("Thành công");
	busyIndicator.hide();
	var dulieu = result.invocationResult.resultSet;
	if (dulieu.length>0) 
		displayFeedsXem(dulieu);
	else 
		loadFeedsFailure();
}

function loadFeedsFailureXem(result){
	WL.Logger.error("Thất bại");
	busyIndicator.hide();
	WL.SimpleDialog.show("Moblie", "Không có kết nối CSDL", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}

function displayFeedsXem(items){
	var ul = $('#itemsListUS');

	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').html('<b>- Mã Sản Phẩm: </b>'+items[i].MaSP);
		var cMaSP = items[i].MaSP;
		var cImages = items[i].Images;
		var cTenSP = items[i].TenSP;
		var cNhaSX = items[i].NhaSX;
		var cNgaySX = items[i].NgaySX;
		var cidLoai = items[i].idLoai;
		var cGia = items[i].Gia;
		
		
		var ViewHinh = $('<div/>').html("<img src='images/"+items[i].Images+"' style='width:100px;height:100px;'>");
		li.append(ViewHinh);
	////******************************
		var VTenSP = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Tên Sản Phẩm: </b>'+cTenSP);
		li.append(VTenSP);
	////******************************
		var loai;
		if(cidLoai==1){
			loai = "Mới";
		}else{
			loai = "Cũ";
		}
		var VidLoai = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Loại: </b>'+loai);
		li.append(VidLoai);
	////******************************
		var VGia = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Giá: </b>'+cGia+' VNĐ');
		li.append(VGia);
		
		var xoa2 = $('<div/>').html("<a href='javascript:loadFeedsXem2("+cMaSP+");'>Xem</a>");
		
		//var xoa2 = $('<div/>').html('<a id="'+items[i].MaSP+'" onclick="bam(this.id)"class="nut">Xem</a>');
		li.append(xoa2);
		
		
		ul.append(li);
	}
}

function bam(cMaSP){
	//document.getElementById("txtTua").value = id;
	window.location.href="#XemItem";
	document.getElementById("demo").innerHTML = cMaSP;
	//loadFeedsXem2();
	//document.getElementById("image").src = cImages;
	//document.getElementById("txtTua").setAttribute("readonly","readonly");
	
}
function back(){
	window.location.href="#page";
	WL.Client.reloadApp();
}
function loadFeedsXem2(cMaSP){
	busyIndicator.show();
	window.location.href="#XemItem";
	//location.reload(cMaSP);
	var MaSP = cMaSP;
	
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'getItemMobileAdapters',
			parameters : [MaSP]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessXem2,
		onFailure : loadFeedsFailureXem2
	});
}

function loadFeedsSuccessXem2(result){
	WL.Logger.debug("Thành công");
	busyIndicator.hide();
	var dulieu = result.invocationResult.resultSet;
	if (dulieu.length>0) 
		displayFeedsXem2(dulieu);
	else 
		loadFeedsFailureXem2();
}

function loadFeedsFailureXem2(result){
	WL.Logger.error("Thất bại");
	busyIndicator.hide();
	WL.SimpleDialog.show("Moblie", "Không có kết nối CSDL", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}

function displayFeedsXem2(items){
	var ul = $('#itemsListUS2');

	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').html('<b style="display:none">- Mã Sản Phẩm:'+items[i].MaSP+' </b>');
		var cMaSP = items[i].MaSP;
		var cImages = items[i].Images;
		var cTenSP = items[i].TenSP;
		var cNhaSX = items[i].NhaSX;
		var cNgaySX = items[i].NgaySX;
		var cidLoai = items[i].idLoai;
		var cGia = items[i].Gia;
	////******************************
		var VTenSP = $('<div/>', {
			'class': 'pubDate'
		}).html('<b  style="color:#F00;font-weight:bold;font-size:24px">Sản Phẩm: '+cTenSP+'</b>');
		li.append(VTenSP);
		
		var ViewHinh = $('<div/>').html("<img src='images/"+items[i].Images+"' style='width:250px;height:250px;'>");
		li.append(ViewHinh);
	
	////******************************
		var loai;
		if(cidLoai==1){
			loai = "Mới";
		}else{
			loai = "Cũ";
		}
		var VidLoai = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Loại: </b>'+loai);
		li.append(VidLoai);
	////******************************
		var VGia = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Giá: </b>'+cGia+' VNĐ');
		li.append(VGia);
		
		//var xoa2 = $('<div/>').html("<a href='javascript:bam("+cMaSP+");'>Xem</a>");
		
		//var xoa2 = $('<div/>').html('<a id="'+items[i].MaSP+'" onclick="bam(this.id)"class="nut">Xem</a>');
		//li.append(xoa2);
		
		
		ul.append(li);
	}
}

//--------------------------//////////////////////////////////////////------------------------------------------

//**************************************************
//**************************************************
//**************************************************
//**************************************************
function loadFeedsLogin(){
	busyIndicator.show();
	
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'getMobileAdaptersLogin',
			parameters : []
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessLogin,
		onFailure : loadFeedsFailure
	});
}

function loadFeedsSuccessLogin(result){
	WL.Logger.debug("Thành công");
	busyIndicator.hide();
	var dulieu = result.invocationResult.resultSet;
	if (dulieu.length>0) 
		displayFeedsLogin(dulieu);
	else 
		loadFeedsFailure();
}

function loadFeedsFailureLogin(result){
	WL.Logger.error("Thất bại");
	busyIndicator.hide();
	WL.SimpleDialog.show("Sinh viên", "Không có kết nối CSDL", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}
function displayFeedsLogin(items){
	var ul = $('#itemsList');

	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').html('<b>- Username: </b>'+items[i].username);
		var use = items[i].username;
		var pass = items[i].password;
		var role2 = items[i].role;
		
		var mk = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Password: </b>'+pass);

		li.append(mk);
		var thuoctinh = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Vai Trò: </b>'+role2);
		li.append(thuoctinh);
		//var xoa2 = $('<div/>').html(' <a id="images/'+items[i].username+'" onclick="xoaUser(this.id)"class="nut">Xóa</a><b>  -  </b><a id="'+items[i].username+'" onclick="capnhatUser(this.id)"class="nut">Update</a>');
		//li.append(xoa2);
		
		ul.append(li);
	}
}
function dangky(){
	dangkyUser();
	alert("Đăng Ký Thành Công");
	window.location.href ="#page"
}
function dangkyUser(){
	
	busyIndicator.show();
	var username = $('#txtDKUsername').val();
	var password = $('#txtDKPassword').val();
	var gioitinh = document.getElementById('txtDKRole').value;
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'addMobileAdapterLogin',
			parameters : [username, password, role]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessLogin,
		onFailure : loadFeedsFailureLogin
	});
	WL.Client.reloadApp();
}
function adduser(){
	themUser();
	window.location.href ="#page"
}
function themUser(){
	
	busyIndicator.show();
	var username = $('#txtUsername').val();
	var password = $('#txtPassword').val();
	var gioitinh = document.getElementById('txtRole').value;
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'addMobileAdapterLogin',
			parameters : [username, password, role]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessLogin,
		onFailure : loadFeedsFailureLogin
	});
	WL.Client.reloadApp();
}
//******************
//******************
function LoginUser(){
	busyIndicator.show();
	var username = $("#txtUser").val();
	var password = $("#txtPass").val();
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'LoginUser',
			parameters : [username,password]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : function(result){
			busyIndicator.hide();
			var data = result.invocationResult.resultSet;
			role = data[0].role;
			username2 = data[0].username;
			console.log(data);
			if (data.length == 0){
				alert("Sai tài khoản hoặc mật khẩu");
			}else
			if(role == "admin"){
					window.location.href = "#Admin"
					//document.getElementById("nut").style.display = "block";
					//$("h1").text("Chúc mừng Admin  " + data[0].username + " đăng nhập thành công");
			}else{
				window.location.href = "#User"
					$("h1").text("Chúc mừng  " + data[0].username + " đăng nhập thành công");
			}
		},
		onFailure : function(){
			busyIndicator.hide();
		}
	});
	
}

function xoaUser(id){
	busyIndicator.show();
	if(confirm("Ban co muon xoa")){
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'deleteMobileAdapterLogin',
			parameters : [id]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessLogin,

	});
	location.reload();
	}
}
function capnhatUser(id){
	window.location.href="#UdateUserAd";
	document.getElementById("txtUserUp").value = id;
	document.getElementById("txtUserUp").setAttribute("readonly","readonly");
}
function updateUserXong(){
	window.location.href="#XemUserAd";
	updateUser();
}
function updateUser(){
	
	busyIndicator.show();
	var password = $('#txtPassUp').val();
	var role = document.getElementById('txtRoleUp').value;
	var username = $('#txtUserUp').val();
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'updateMobileAdapterLogin',
			parameters : [password, role, username]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccessLogin,

	});
	location.reload();
}
//*****************************************************************************************

//********************San pham ad*****************************
function loadFeeds(){
	busyIndicator.show();
	
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'getMobileAdaptersSanPham',
			parameters : []
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccess,
		onFailure : loadFeedsFailure
	});
}

function loadFeedsSuccess(result){
	WL.Logger.debug("Thành công");
	busyIndicator.hide();
	var dulieu = result.invocationResult.resultSet;
	if (dulieu.length>0) 
		displayFeeds(dulieu);
	else 
		loadFeedsFailure();
}

function loadFeedsFailure(result){
	WL.Logger.error("Thất bại");
	busyIndicator.hide();
	WL.SimpleDialog.show("Sinh viên", "Không có kết nối CSDL", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}

function displayFeeds(items){
	var ul = $('#itemsListSV');

	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').html('<b>- Mã Sản Phẩm: </b>'+items[i].MaSP);
		var cMaSP = items[i].MaSP;
		var cTenSP = items[i].TenSP;
		var cNhaSX = items[i].NhaSX;
		var cNgaySX = items[i].NgaySX;
		var cidLoai = items[i].idLoai;
		var cGia = items[i].Gia;
		
		var ViewHinh = $('<div/>').html("<img src='images/"+items[i].Images+"' style='width:50px;height:50px;'>");
		li.append(ViewHinh);
		
		
	////******************************
		var VTenSP = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Tên: </b>'+cTenSP);
		li.append(VTenSP);
	////******************************
		var VNhaSX = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Nhà Sản Xuất: </b>'+cNhaSX);
		li.append(VNhaSX);
	////******************************
		var VNgaySX = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Ngày Sản Xuất: </b>'+cNgaySX);
		li.append(VNgaySX);
	////******************************
		var loai;
		if(cidLoai==1){
			loai = "Mới";
		}else{
			loai = "Cũ";
		}
		var VidLoai = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Loại: </b>'+loai);
		li.append(VidLoai);
	////******************************
		var VGia = $('<div/>', {
			'class': 'pubDate'
		}).html('<b>- Giá: </b>'+cGia+' VNĐ');
		li.append(VGia);
		var xoa2 = $('<div/>').html("<a href='javascript:xoaSV("+cMaSP+");'>Delete</a><b>  -  </b><a href='javascript:SuaMobile("+cMaSP+");'>Update</a>");
		li.append(xoa2);
		
		ul.append(li);
	}
}
//*******************************************
//*********************
//**************
if (window.File && window.FileReader && window.FileList && window.Blob) {
    
	   //this is not completely neccesary, just a nice function I found to make the file size format friendlier
	    //http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
	    function humanFileSize(bytes, si) {
	        var thresh = si ? 1000 : 1024;
	        if(bytes < thresh) return bytes + ' B';
	        var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
	        var u = -1;
	        do {
	            bytes /= thresh;
	            ++u;
	        } while(bytes >= thresh);
	        return bytes.toFixed(1)+' '+units[u];
	    }


	  //this function is called when the input loads an image
	    function renderImage(file){
	        var reader = new FileReader();
	        reader.onload = function(event){
	            the_url = event.target.result
	      //of course using a template library like handlebars.js is a better solution than just inserting a string
	           $('#preview').html("<img src='"+the_url+"' />")
	        }
	    
	    //when the file is read it triggers the onload event above.
	        reader.readAsDataURL(file);
	    }

	  //watch for change on the 
	    $( "#txtImages" ).change(function() {
	        console.log("photo file has been chosen")
	        //grab the first image in the fileList
	        //in this example we are only loading one file.
	        console.log(this.files[0].size)
	        renderImage(this.files[0])

	    });
	  
	    $( "#the-video-file-field" ).change(function() {
	        console.log("video file has been chosen")
	        //grab the first image in the fileList
	        //in this example we are only loading one file.
	        console.log(this.files[0].size)
	        renderVideo(this.files[0])

	    });

	} else {

	  alert('The File APIs are not fully supported in this browser.');

	}
//**********************
//*********************
function addFeeds(){
	
	busyIndicator.show();
	var MaSP = $('#txtMaSP').val();
	var Images = document.getElementById("txtImages").value;
	var idLoai;
	var loai = document.getElementById('txtidLoai').value;
	if(loai =="Mới"){
		idLoai =1;
	}else{
		idLoai =2;
	}
	var TenSP = $('#txtTenSP').val();
	var NhaSX = $('#txtNhaSX').val();
	var Gia = $('#txtGia').val();
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'addMobileAdapter',
			parameters : [MaSP, idLoai, TenSP, NhaSX, Gia, Images]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccess,
		onFailure : loadFeedsFailure
	});
	WL.Client.reloadApp();
}
function addMobile(){
	addFeeds();
	window.location.href="#Admin";
}
function xoaSV(MaSP){
	busyIndicator.show();
	if(confirm("Ban co muon xoa")){
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'deleteMobileAdapter',
			parameters : [MaSP]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccess,

	});
	WL.Client.reloadApp();
	}
}
function SuaMobile(cMaSP){
	document.getElementById("txtMaSP2").value = cMaSP;
	document.getElementById("txtMaSP2").setAttribute("readonly","readonly");
	window.location.href="#UpdateMobileAd";
	
}
function SuaXong(){
	updateMobile();
	window.location.href="#Admin";
}
function updateMobile(){
	busyIndicator.show();
	var MaSP = $('#txtMaSP2').val();
	var Images = document.getElementById("txtImages2").value;
	var idLoai;
	var loai = document.getElementById('txtidLoai2').value;
	if(loai =="Mới"){
		idLoai =1;
	}else
	if(loai =="Cũ"){
		idLoai =2;
	}
	var TenSP = $('#txtTenSP2').val();
	var NhaSX = $('#txtNhaSX2').val();
	var Gia = $('#txtGia2').val();
	
	var invocationData = {
			adapter : 'MobileAdapter',
			procedure : 'updateMobileAdapter',
			parameters : [Images, idLoai, TenSP, NhaSX, Gia, MaSP]
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccess,

	});
	WL.Client.reloadApp();
}

