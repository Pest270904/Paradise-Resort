# Website quản lý đặt phòng khách sạn
**_<u>Bạn có thể xem thử web tại đây_**: [Paradise Resort](https://paradise-resort-bice.vercel.app/) 👈

## <u>A. Thông tin môn học, giảng viên, thành viên nhóm

**- Giảng viên hướng dẫn:** Trần Tuấn Dũng

**- Môn học:** Lập trình ứng dụng Web - NT208.O23.ANTT

**- Nhóm 3:**

-  **Trưởng nhóm:** Lê Quốc Ngô - 22520951 ([@lengo0951](https://github.com/lengo0951))

- Trần Tiễn Nhật - 22521030 ([@tnh47](https://github.com/tnh47))

- Trần Anh Khôi - 22520701 ([@anhkhoi312](https://github.com/anhkhoi312))

- Nguyễn Hồ Nhật Khoa - 22520677 ([@NKhoauit](https://github.com/NKhoauit))

- Nguyễn Tuấn Phát - 22521076 ([@Pest270904](https://github.com/Pest270904))

**- Video giới thiệu về framework backend NestJS:** [Youtube](https://youtu.be/-4oWuhSvy28?si=Uo2Ou3I4M9AucQ9l)

## <u>B. Mô tả đề tài
<p align="center"> <b><u>Web đặt phòng khách sạn Paradise Resort</p>

![](https://i.postimg.cc/FzQyq0gh/B-n-t-duy-l-m-t-s-t-ch-c-th-ng-tin-m-t-c-ch-tr-c-quan-N-cho-th-y-m-i-quan-h-gi-a-c-c-ph.jpg)

- Một trang web khách sạn cung cấp những chức năng cơ bản: đăng ký/đăng nhập, hiển thị danh sách phòng, đặt phòng, thanh toán, cơ sở vật chất, chat,...

- **Admin:** giới thiệu phòng, quản lý account người dùng, quản lý phòng, quản lý các đơn đặt phòng, chat với từng user,...

- **Người dùng:** thay đổi thông tin cá nhân, đặt phòng, chat, thanh toán trực tuyến, đánh giá, review,...

### <u>Database Diagram:
![](https://i.postimg.cc/Dyvfg8ks/aaaa.webp)

### <u>Công nghệ sử dụng:

- Frontend:  HTML, CSS, JS, render page bằng [Express-handlebars](https://www.npmjs.com/package/express-handlebars)

- Backend: [Nest.js](https://nestjs.com/) - TypeScript

- Database: PostgreSQL hỗ trợ bằng Docker và [Prisma](https://www.prisma.io/)

## <u>C. Setup và Build

### <u>C.1 Yêu cầu:

1. Hệ điều hành: Window, Linux, MacOS

2. Runtime enviroment for [Nodejs](https://nodejs.org/en)

3. (**Optional**) [Docker](https://www.docker.com/) để lưu database ở local 

### <u>C.2 Setup

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
![](https://i.postimg.cc/pLJPnjL3/a.png)

- **<u>(Optional when you want to use your own database on server)** Go to file ``/.env``  then replace the default docker's path of ``DATABASE_URL`` to your own database url, for example:
![](https://i.postimg.cc/PJJBNLRs/docker.png)

- Set up database

```console

		------ Start Postgres in Docker and push migrations of database ------

			(Run this command in new terminal if you want to reset the databases or when you haven't started database before)

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