<!-- (**_This site was built using_**: [GitHub Pages](https://pest270904.github.io/Project-Web-App/) 👈) -->

# Website quản lý đặt phòng khách sạn

**Nhóm 3:**

- **Trưởng nhóm:** Lê Quốc Ngô - 22520951 ([@lengo0951](https://github.com/lengo0951))
- Trần Tiễn Nhật - 22521030 ([@tnh47](https://github.com/tnh47))
- Trần Anh Khôi - 22520701 ([@anhkhoi312](https://github.com/anhkhoi312))
- Nguyễn Hồ Nhật Khoa - 22520677 ([@NKhoauit](https://github.com/NKhoauit))
- Nguyễn Tuấn Phát - 22521076 ([@Pest270904](https://github.com/Pest270904))

**Giảng viên:** Trần Tuấn Dũng

## A. Mô tả đề tài

![](/public/img/general/mindmap.jpg)

- Một trang web khách sạn cung cấp những chức năng cơ bản: đăng ký/đăng nhập, hiển thị danh sách phòng, cơ sở vật chất, chat,...
- Chủ khách sạn: giới thiệu phòng, lên bài quảng cáo, quản lý phòng, kết nối với hệ thống hoạt động xung quanh(du lịch, nhà hàng, di chuyển).
- Người dùng: tìm phòng theo từng hạng mục, đặt phòng, chat, thanh toán trực tuyến, đánh giá.

### Công nghệ sử dụng:

- Ngôn ngữ sử dụng: HTML, CSS, JS, TS
- Framework: [Nest.js](https://nestjs.com/), [Express-handlebars](https://www.npmjs.com/package/express-handlebars), [ExpressJS](https://expressjs.com/)
- Database: PostgreSQL with Docker and [Prisma](https://www.prisma.io/)

## B. Setup và Build

### B.1 Yêu cầu:

1.  Hệ điều hành: Window, Linux, MacOS
2.  Runtime enviroment [Nodejs](https://nodejs.org/en)
3.  [Docker](https://www.docker.com/) for hosting database

### B.2 Setup
- Git clone
```console
    $ git clone https://github.com/Pest270904/Project-Web-App.git
```

- Change Directory
```console
    $ cd .\Project-Web-App\
```

- Dowload package needed for the project
```console
    $ npm i
```

- Set up database (using docker with prisma)
```console
        ------ 1. Start Postgres in Docker and push migrations of database ------
            (Run this command in new terminal if you want to reset the databases)

    $ npm run db:dev:restart

        ------ 2. Host database ------

    $ npx prisma studio

        ---------------------------- FOR DEV ----------------------------
            (Run this command when you change the code in databases)

    $ npx prisma migrate dev
```

- Compile and build
```console
    ---- (!) Open new terminal seperate from terminal running database (!) ----

    $ npm run start

            ------ Or ------
            
    $ npm run start:dev (start api in dev mode)
```

- Lên browser vào link: http://localhost:3000/ để vào website

### B.3 Others
- Go to http://localhost:3000/room/create to create data for rooms