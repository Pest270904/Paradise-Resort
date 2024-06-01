# <p align="center">Website quản lý đặt phòng khách sạn Paradise Resort</p>

<br />

<p align="center"> <b><ins>Bạn có thể xem thử web tại đây</ins></b>: <a href="https://paradise-resort-bice.vercel.app/">Paradise Resort</a> 👈</p>

<br />

## <ins><p align="center">A. Thông tin môn học, giảng viên, thành viên nhóm</p></ins>

**- Giảng viên hướng dẫn:** Trần Tuấn Dũng

**- Môn học:** Lập trình ứng dụng Web - NT208.O23.ANTT

**- Nhóm 3:**

-  **Trưởng nhóm:** Lê Quốc Ngô - 22520951 ([@lengo0951](https://github.com/lengo0951))

- Trần Tiễn Nhật - 22521030 ([@tnh47](https://github.com/tnh47))

- Trần Anh Khôi - 22520701 ([@anhkhoi312](https://github.com/anhkhoi312))

- Nguyễn Hồ Nhật Khoa - 22520677 ([@NKhoauit](https://github.com/NKhoauit))

- Nguyễn Tuấn Phát - 22521076 ([@Pest270904](https://github.com/Pest270904))

**- Video giới thiệu về framework backend NestJS:** [Youtube](https://youtu.be/-4oWuhSvy28?si=Uo2Ou3I4M9AucQ9l)

## <p align="center"><ins>B. Mô tả đề tài</ins></p>
### <ins>B.1 Tổng quan</ins>

- **Tên đề tài**: Website quản lý đặt phòng khách sạn Paradise Resort.

- Một trang web khách sạn cung cấp những chức năng cơ bản: đăng ký/đăng nhập, hiển thị danh sách phòng, đặt phòng, thanh toán, cơ sở vật chất, chat,...

- **Admin:** giới thiệu phòng, quản lý account người dùng, quản lý phòng, quản lý các đơn đặt phòng, chat với từng user,...

- **Người dùng:** thay đổi thông tin cá nhân, đặt phòng, chat, thanh toán trực tuyến, đánh giá, review,...

<br>

<p align="center"><ins>Mindmap</p></ins>

![](https://i.postimg.cc/FzQyq0gh/B-n-t-duy-l-m-t-s-t-ch-c-th-ng-tin-m-t-c-ch-tr-c-quan-N-cho-th-y-m-i-quan-h-gi-a-c-c-ph.jpg)

<br />

<p align="center"><ins>Database Diagram</ins></p>

![](https://i.postimg.cc/Dyvfg8ks/aaaa.webp)

<br />

### <ins>B.2 Tính năng</ins>
- **User**:
	-  Đăng ký/ Đăng nhập trên website.
	- Xem danh sách phòng, cơ sở vật chất của khách sạn.
	-  Chat với admin.
	- Đặt phòng, thanh toán trực tuyến.
	- Đánh giá chất lượng dịch vụ của khách sạn.

- **Admin**:
	- Xem tổng doanh thu, số khách hàng, số đánh giá của khách hàng.
	- Xem tổng số phòng và số lượng phòng còn trống.
	- Chat với khách hàng.
	- Quản lý danh sách thông tin của khách hàng đã đăng ký tài khoản trên website.
	- Quản lý số lượng đơn đặt phòng, trạng thái của đơn đặt phòng.
	- Hủy đơn đặt phòng.
  
- **Tính năng nâng cao:** Thanh toán bằng VNPay

<br />

### <ins>B.3 Công nghệ sử dụng</ins>

- **Frontend:**  HTML, CSS, JS, render page bằng [Express-handlebars](https://www.npmjs.com/package/express-handlebars)

- **Backend:** [Nest.js](https://nestjs.com/) - TypeScript

- **Database:** PostgreSQL hỗ trợ bằng Docker và [Prisma](https://www.prisma.io/)

<br />

### <ins>B.4 Các package dependencies chính: </ins>

- **nestjs packages**: các packages cơ bản của nestjs
- **prisma**: đơn giản việc xây dựng database
- **express-handlebars:** hỗ trợ render các file html
- **argon2**: hash password
- **nestjs-jwt** & **passport-jwt**: tạo và verify jwt token cho user
- **socket.io**: chat realtime
- **cookie-parser**: lấy cookie từ request

<br />

### <ins>B.5 Google page speed:</ins>
![](https://i.ibb.co/jv4sTRn/page-Speed.webp)

<br />

## <ins><p align="center">C. Setup và Build</p></ins>

### <ins>C.1 Yêu cầu:</ins>

1. Hệ điều hành: Window, Linux, MacOS

2. Runtime enviroment for [Nodejs](https://nodejs.org/en)

3. (**Optional**) [Docker](https://www.docker.com/) để lưu database ở local 

<br />

### <ins>C.2 Setup</ins>

- Git clone

```console

	$ git clone https://github.com/Pest270904/Paradise-Resort.git

```

- Change Directory

```console

	$ cd .\Paradise-Resort\

```

- Dowload package needed for the project

```console

	$ npm i

```
- Change some codes in ``/src/main.ts`` to be able to compile code locally:
<br />

![](https://i.postimg.cc/pLJPnjL3/a.png)

- **<ins>(Optional when you want to use your own database on server)</ins>** Go to file ``/.env``  then replace the default docker's path of ``DATABASE_URL`` to your own database url, for example:
<br />

![](https://i.postimg.cc/PJJBNLRs/docker.png)

- Set up database

```console

		------ Start Postgres in Docker and push migrations to database  ------
		(Run this command to clear db in docker or start a new docker to store db)

	$ npm run db:dev:restart

		---------------------------- FOR DEV ----------------------------
		    (Run these commands when you change the code in databases)

	$ npx prisma migrate dev

	$ npx prisma generate

```

- Compile and build

```console

	$ npm run start

		------ Or ------

	$ npm run start:dev (start api in dev mode)

```
- Go to url: http://localhost:3000/ to preview the website

<br />

## <ins><p align="center">D. Testing</p></ins>

- To preview the database :
``` console
		------ To preview data in database ------
	      (Run in a new terminal in the main directory)

	$ npx prisma studio
```

- **(!)** Make sure go to route ``/admin/create`` to create admin account first when deploy database.

- **Test account for payment**

<div align="center">

| Ngân hàng  	  | NCB   				 |
| :--------: 	  | :---: 			     |
| Số thẻ  		  | 9704198526191432198  |
| Tên chủ thẻ	  | NGUYEN VAN A 		 |
| Ngày phát hành  | 07/15 				 |
| Mật khẩu OTP    | 123456				 |

</div>