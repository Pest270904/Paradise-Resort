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

## <ins><p align="center">E. Câu hỏi</p></ins>
### <ins>Câu 1: NestJS có ưu điểm gì, và NestJS có phổ biến không ? NestJS có ưu điểm gì so với tiền thân Angular?<ins>
- NestJS là một framework phát triển ứng dụng backend dựa trên Node.js và TypeScript, nổi bật với nhiều ưu điểm và đang ngày càng trở nên phổ biến trong cộng đồng phát triển phần mềm.

**<ins>1.1 Ưu điểm của NestJS<ins>**
+ **Kiến trúc mô-đun:** NestJS cho phép phát triển ứng dụng theo kiến trúc mô-đun, giúp dễ dàng quản lý và mở rộng. Mỗi module có thể được phát triển và kiểm thử độc lập, sau đó kết hợp lại thành một ứng dụng hoàn chỉnh.
+ **Hỗ trợ TypeScript:** NestJS được viết hoàn toàn bằng TypeScript, cung cấp các tính năng như kiểm tra kiểu tĩnh, hỗ trợ hiện đại và tích hợp tốt với các công cụ TypeScript khác, giúp tăng năng suất và chất lượng mã nguồn.
+ **Tích hợp dễ dàng với các thư viện khác:** NestJS tích hợp tốt với các thư viện và framework của Node.js như Express, Fastify, Mongoose, TypeORM, và nhiều thư viện khác, giúp dễ dàng mở rộng và tùy chỉnh ứng dụng.
+ **Tính mở rộng và tái sử dụng:** Với việc hỗ trợ Dependency Injection (DI), NestJS cho phép tái sử dụng mã nguồn và dễ dàng mở rộng ứng dụng. DI giúp quản lý các phụ thuộc một cách hiệu quả và giảm sự phụ thuộc chặt chẽ giữa các thành phần.
+ **Hỗ trợ tích hợp testing:** NestJS cung cấp các công cụ tích hợp sẵn cho việc viết unit test và e2e test, giúp đảm bảo chất lượng mã nguồn và phát hiện sớm các lỗi trong quá trình phát triển.
+ **Cộng đồng và tài liệu phong phú:**: NestJS có cộng đồng phát triển lớn và tài liệu phong phú, bao gồm cả các tài liệu chính thức và các tài liệu từ cộng đồng, giúp lập trình viên dễ dàng học tập và giải quyết các vấn đề gặp phải.

**<ins>1.2 Độ phổ biến của NestJS<ins>**
+ NestJS đang ngày càng trở nên phổ biến trong cộng đồng phát triển phần mềm, đặc biệt là trong các dự án cần xây dựng ứng dụng backend. Sự phổ biến của NestJS được thể hiện qua:
+ Dự án NestJS trên GitHub có số lượng sao (stars) lớn, cho thấy sự quan tâm và sử dụng rộng rãi từ cộng đồng.
+ Cộng đồng phát triển của NestJS trên các nền tảng như Stack Overflow, Reddit, và các diễn đàn lập trình khác đang ngày càng lớn mạnh, với nhiều bài viết, thảo luận, và giải đáp vấn đề.
+ Có nhiều tài liệu, bài viết blog, video hướng dẫn, và khóa học trực tuyến về NestJS, từ cơ bản đến nâng cao, giúp lập trình viên dễ dàng tiếp cận và học tập.
+ Nhiều công ty và dự án lớn đã và đang sử dụng NestJS cho các ứng dụng backend của họ, cho thấy sự tin tưởng vào khả năng và hiệu suất của framework này.

**<ins>1.3 So sánh về ưu điểm của NestJS so với Angular<ins>**
+ **1.3.1 Thiết kế cho Backend:**
	- NestJS: Được thiết kế đặc biệt cho việc phát triển ứng dụng backend, với trọng tâm là xây dựng API RESTful, GraphQL, và microservices.
	- Angular: Là framework frontend dùng để xây dựng các ứng dụng web tương tác phía người dùng.

+ **1.3.2 Dependency Injection (DI) mạnh mẽ:** NestJS áp dụng mô hình Dependency Injection tương tự như Angular, nhưng tối ưu hóa cho môi trường backend. DI trong NestJS giúp quản lý các dịch vụ và mô-đun dễ dàng, nâng cao khả năng tái sử dụng và bảo trì mã nguồn.

+ **1.3.3. Kiến trúc mô-đun:** Cả hai framework đều hỗ trợ kiến trúc mô-đun, nhưng NestJS ứng dụng mô-đun hóa ở cấp độ backend. Điều này giúp dễ dàng quản lý và mở rộng các thành phần của ứng dụng backend.

+ **1.3.4 Hỗ trợ cho Microservices:**
	- NestJS: Có sẵn các công cụ và thư viện hỗ trợ phát triển microservices, như tích hợp với RabbitMQ, Kafka, và gRPC. Điều này giúp xây dựng các hệ thống phân tán và khả năng mở rộng cao.
	- Angular: Không được thiết kế để hỗ trợ trực tiếp microservices vì nó chủ yếu tập trung vào giao diện người dùng.

+ **1.3.5 Tích hợp với cơ sở dữ liệu:** NestJS tích hợp dễ dàng với nhiều ORM và ODM như TypeORM, Sequelize, và Mongoose, giúp quản lý kết nối và tương tác với cơ sở dữ liệu hiệu quả. Angular không có tính năng này vì nó không liên quan đến backend.

+ **1.3.6 Tính mở rộng và tùy chỉnh cao:** NestJS cung cấp các cơ chế linh hoạt để mở rộng và tùy chỉnh ứng dụng backend thông qua middleware, guards, interceptors, và filters. Những tính năng này giúp xây dựng các logic phức tạp và bảo mật.

+ **1.3.7 Tóm tắt:**
	- **NestJS**: Tập trung vào backend, cung cấp các công cụ và tính năng mạnh mẽ để phát triển API, microservices, và quản lý cơ sở dữ liệu. Nó thừa hưởng nhiều nguyên tắc thiết kế từ Angular nhưng tối ưu hóa cho môi trường server-side.
	- **Angular**: Tập trung vào frontend, giúp xây dựng giao diện người dùng phong phú và tương tác. Nó phù hợp cho việc phát triển các ứng dụng web đơn trang (SPA) và cung cấp các công cụ mạnh mẽ để quản lý trạng thái giao diện và tương tác người dùng.

### <ins>Câu 2: NestJS có gì nổi bật hơn các framework khác? Làm thế nào để tích hợp và sử dụng WebSocker để tạo các ứng dụng realtime.<ins>

**<ins>2.1 Đặc điểm nổi bật của NestJS<ins>**
+ **Kiến trúc mô-đun:** NestJS cho phép phát triển ứng dụng theo kiến trúc mô-đun, giúp mã nguồn dễ quản lý, mở rộng và bảo trì. Mỗi module có thể được phát triển và kiểm thử độc lập.
+ **Sử dụng TypeScript:** NestJS được xây dựng hoàn toàn trên TypeScript, mang lại các lợi ích về kiểm tra kiểu tĩnh, hỗ trợ IDE tốt hơn, và giảm thiểu lỗi khi lập trình.
+ **Hỗ trợ Dependency Injection (DI):** NestJS tích hợp sẵn cơ chế DI mạnh mẽ, giúp quản lý các dịch vụ và phụ thuộc dễ dàng, tăng khả năng tái sử dụng và mở rộng mã nguồn.
+ **Tích hợp tốt với các thư viện và framework khác:** NestJS hỗ trợ tích hợp dễ dàng với các thư viện và framework của Node.js như Express, Fastify, TypeORM, Mongoose, và nhiều hơn nữa.
+ **Hỗ trợ mạnh mẽ cho các kỹ thuật và mô hình phát triển hiện đại:** NestJS hỗ trợ xây dựng các ứng dụng microservices, các mô hình event-driven, và các hệ thống phân tán. Nó cũng tích hợp tốt với các công nghệ như GraphQL, WebSocket, và CQRS.
+ **Dễ dàng viết unit test và e2e test:** NestJS cung cấp các công cụ tích hợp sẵn cho việc viết và chạy unit test và e2e test, giúp đảm bảo chất lượng mã nguồn và phát hiện lỗi sớm.

**<ins>2.2 Tích hợp và sử dụng WebSocker để tạo các ứng dụng realtime<ins>**
- NestJS có hỗ trợ tích hợp WebSocket một cách dễ dàng thông qua @nestjs/websockets package
- Các bước thực hiện (demo) 
	-**Bước 1**: Tải package WebSocket
	```console
	npm install --save @nestjs/websockets @nestjs/platform-socket.io	
	```
	- **Bước 2:** Tạo một Gateway WebSocket
	``` js
	import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
	import { Server, Socket } from 'socket.io';

	@WebSocketGateway()
	export class ChatGateway {
		@WebSocketServer()
		server: Server;

		@SubscribeMessage('message')
		handleMessage(@MessageBody() message: string, client: Socket): void {
			this.server.emit('message', message);
		}
	}
	```
	- **Bước 3:** Đăng kí chat.gateway.js vào module chính(mặc định là app.module.ts)
	- **Bước 4:** Viết code HTML và JavaScript
	``` html
	<script>
		const socket = io('http://localhost:3000')

		socket.on('connect', () => {
			console.log('Connected to server')
		})

		socket.on('message', () => {
			console.log('Message from server', data)
		})

		function sendMessage() {
			const message = document.getElementById('messageInput').value
			socket.emit('message', message)
		}
	</script>	
	```

### <ins>Câu 3: Authomodule của NestJS vận hành như thế nào. Nó có công cụ gì, hay nó là công cụ. Tại sao dùng NestJS thay vì ExpressJS?<ins>

**<ins>3.1 AuthModule, thư viên, công cụ xây dụng AuthModule<ins>**
- AuthModule trong NestJS thực chất không phải là một công cụ cụ thể mà là một module có thể bạn tạo ra để xử lý xác thực và phân quyền người dùng. NestJS cung cấp các công cụ và thư viện tích hợp sẵn để hỗ trợ việc xây dựng module này một cách dễ dàng và hiệu quả. 
- Công cụ và Thư viện Chính để Xây dựng AuthModule:
	- Passport.js:
		- Passport là một middleware xác thực cho Node.js, hỗ trợ nhiều chiến lược xác thực khác nhau như JWT, OAuth, Local, v.v.
		- NestJS cung cấp gói @nestjs/passport để tích hợp Passport.js một cách dễ dàng.
	- JWT (JSON Web Tokens):
		- JWT được sử dụng phổ biến để tạo token xác thực và phân quyền.
		- NestJS cung cấp gói @nestjs/jwt để dễ dàng tích hợp JWT vào AuthModule của bạn.

**<ins>3.2 Cấu Trúc AuthModule và Các Thành Phần Chính<ins>**
- **AuthModule:** Là module chứa các thành phần liên quan đến xác thực như AuthService, AuthController, và các chiến lược xác thực.
- **AuthService:** Chứa các logic xác thực và tạo token.
- **AuthController:** Xử lý các yêu cầu HTTP liên quan đến xác thực như đăng nhập, đăng ký.
- **Guards:** Dùng để bảo vệ các route chỉ cho phép truy cập khi người dùng đã xác thực hoặc có quyền hạn phù hợp.
- **Decorators:** Dùng để gắn thông tin xác thực vào các route handler một cách rõ ràng và dễ quản lý.

**<ins>3.3 Cách vận hành Authomodule của NestJS<ins>**
<p align="center"><ins>auth.module.ts</ins></p>

![](https://i.postimg.cc/1t94RQzY/Screenshot-2024-06-12-161557.png)

<br />

<p align="center"><ins>auth.controller.ts</ins></p>

![](https://i.postimg.cc/65D32R3Z/Screenshot-2024-06-12-161629.png)

<br />

<p align="center"><ins>auth.service.ts</ins></p>

![](https://i.postimg.cc/rFtykmJw/Screenshot-2024-06-12-161706.png)

**<ins>3.4 Tại sao dùng NestJS thay vì ExpressJS<ins>**
- **Kiến trúc mô-đun:** NestJS giúp tổ chức mã nguồn theo kiến trúc mô-đun, giúp quản lý và bảo trì dễ dàng hơn, đặc biệt trong các ứng dụng lớn.
- **Sử dụng TypeScript:** NestJS tận dụng sức mạnh của TypeScript, cung cấp tính năng kiểm tra kiểu tĩnh và hỗ trợ phát triển mã nguồn an toàn và hiệu quả hơn.
- **Dependency Injection (DI):** NestJS tích hợp sẵn DI, giúp quản lý các phụ thuộc và cải thiện khả năng tái sử dụng và bảo trì mã nguồn.	
- **Tích hợp dễ dàng với các thư viện phổ biến:** NestJS tích hợp tốt với các thư viện và công cụ phổ biến như TypeORM, Mongoose, Passport.js, GraphQL, và các thư viện khác.
- **Tích hợp sẵn các công cụ và tính năng hiện đại:** NestJS hỗ trợ các tính năng hiện đại như microservices, event-driven architecture, WebSockets, và CQRS, giúp xây dựng các ứng dụng phức tạp và hiện đại một cách dễ dàng.
- **Hỗ trợ mạnh mẽ cho testing:** NestJS cung cấp các công cụ tích hợp sẵn cho việc viết unit test và e2e test, giúp đảm bảo chất lượng mã nguồn.

### <ins>Câu 4: Xử lí xác thực và ủy quyền người dùng trong NestJS bằng cách nào?<ins>
- Xử lý xác thực và ủy quyền người dùng trong NestJS bao gồm việc xác minh danh tính người dùng (xác thực) và đảm bảo người dùng có quyền thực hiện các hành động nhất định (ủy quyền). NestJS cung cấp các công cụ mạnh mẽ và tích hợp dễ dàng với các thư viện phổ biến như Passport.js và JWT để thực hiện các tác vụ này.
- Các bước thực hiện: 
	+ Tạo AuthModule, AuthService, và AuthController( ví dụ ở câu 3 )
	+ Tích hợp Passport.js và JWT
	+ Sử dụng Guards và Decorators cho ủy quyền
- Ở ví dụ bên dưới sẽ dùng Guards để ủy quyền cho người dùng nào là admin và phải đăng nhập vào tài khoản admin mới truy cập được đến trang đó 

<br />

- **Ví dụ về sử dụng Guards trong admin.controller.ts**:
<p align="center"><ins>admin.guard.ts</ins></p>

![](https://i.postimg.cc/LXXR065R/Screenshot-2024-06-12-161742.png)

<br />

<p align="center"><ins>admin.controller.ts</ins></p>

![](https://i.postimg.cc/8Ph5vcrn/Screenshot-2024-06-12-161813.png)