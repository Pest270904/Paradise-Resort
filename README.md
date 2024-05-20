# <p align="center">Website quản lý đặt phòng khách sạn</p>

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

## <ins><p align="center">B. Mô tả đề tài</p> </ins>

<ins><p align="center">Mindmap của đề tài</p></ins>

![](https://i.postimg.cc/FzQyq0gh/B-n-t-duy-l-m-t-s-t-ch-c-th-ng-tin-m-t-c-ch-tr-c-quan-N-cho-th-y-m-i-quan-h-gi-a-c-c-ph.jpg)

- Một trang web khách sạn cung cấp những chức năng cơ bản: đăng ký/đăng nhập, hiển thị danh sách phòng, đặt phòng, thanh toán, cơ sở vật chất, chat,...

- **Admin:** giới thiệu phòng, quản lý account người dùng, quản lý phòng, quản lý các đơn đặt phòng, chat với từng user,...

- **Người dùng:** thay đổi thông tin cá nhân, đặt phòng, chat, thanh toán trực tuyến, đánh giá, review,...

<br />

<ins><p align="center">Database Diagram</p></ins>

![](https://i.postimg.cc/Dyvfg8ks/aaaa.webp)

<br />

### <ins>Công nghệ sử dụng</ins>

- **Frontend:**  HTML, CSS, JS, render page bằng [Express-handlebars](https://www.npmjs.com/package/express-handlebars)

- **Backend:** [Nest.js](https://nestjs.com/) - TypeScript

- **Database:** PostgreSQL hỗ trợ bằng Docker và [Prisma](https://www.prisma.io/)

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

		------ Start Postgres in Docker and push migrations to database ------

			(Run this command in new terminal if you want to reset the database or when you haven't started database before)

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

- **(Optional)** To preview the database :
``` console
		------ To preview data in database ------

	$ npx prisma studio
```

- Lên browser vào link: http://localhost:3000/ để vào preview website