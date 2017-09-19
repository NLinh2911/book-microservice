# UI layer riêng biệt:
* book.com (Nunjucks, Express)
  * Liệt kê books, liệt kê theo category, author
  * Tìm kiếm 
  * Đăng kí/ đăng nhập
  * Có thể tải sau khi đăng nhập
  * Sẽ có chỗ *write your own book* -> click vào chuyển sang write.book.com
* admin.book.com (Nuxt, Express)
  * quản lý tất cả sách: trỏ vào book service
  * quản lý users (thêm quyền, chỉnh sửa thông tin): trỏ vào user service
  * payroll: tính toán lượt tải sách, tính profit của author
* write.book.com (Vuejs, Express)
  * Đăng kí tài khoản là có thể viết sách
  * Cứ bắt đầu viết nháp là thành author (có thể có cột author trong bảng user để phân biệt hoặc cập nhật vào subset author table trong book service)
  * Xuất bản thì cập nhật vào bảng book

# Backend: xây dựng các services riêng biệt
Các ứng dụng sẽ trỏ đến các services cần thiết khác nhau. Tất cả các services là API trả về json

Dự kiến các services và dbs
## Web services (các app trên)

## User service: 
* User service xử lý xác thực, phân quyền người dùng (JWT), sử dụng CSDL riêng là user-db
* Ở các trang web services, người dùng log in/ log out thì những requests này sẽ gửi qua axios đến user service để xử lý và trả về kết quả cho web services
* Sử dụng JWT, mỗi lần sẽ trả về 1 token và user có thể lưu token này vào localStorage, sau đó requests từ user này đều cần gắn token này trong req.header để xác thực 

## Book service:
* Book service lưu trữ và trả về dữ liệu liên quan đến book
* Các hành động CRUD đều là requests gửi về service này xử lý. Ví dụ, book.com liệt kê các sách sẽ gửi GET request, hay write.book.com tạo và xuất bản sách sẽ là POST request.
* Book db: 
  * book
  * category
  * draft_book
  * author (maybe)
* Trong bảng book lưu author\_id (id này cũng chính là user\_id trong user db).    * Thử nghiệm lưu author_id nếu muốn lấy author data thì thêm 1 request vào user service. Làm sao để đánh giá tốc độ? 
  * Thử nghiệm subset của user db đc lưu trong book db. Cách đồng bộ và cập nhật dữ liệu? 

## Todo: 15/09
* Vẽ book-db
* Tạo book-service: theo movie-service
* front-end: vue

## Cấu trúc:

| Name             | Service | Container | Tech                 |
|------------------|---------|-----------|----------------------|
| Book.com         | Web 1   | web 1     | Nunjucks, Express    |
| Admin.book.com   | Web 2   | web 2     | Nuxt                 |
| Book.com         | Web 3   | web 3     | Vuejs, Vue-router    |
| Book API         | Books   | books     | Node, Express        |
| Book DB          | Books   | books-db  | Postgres             |
| Swagger          | Books   | swagger   | Swagger UI           |
| Users API        | Users   | users     | Node, Express        |
| Users DB         | Users   | users-db  | Postgres             |
| Functional Tests | Test    | n/a       | TestCafe             |

## Questions:
* For route error handler, what is the difference between just calling `next(err)` and `return next(err)`

## 17/09:
* Tạo book service: 
* test API với in memory database `db/fake-model.js`, chạy test file `mocha book.fake.js`
* dùng knex để tạo và kết nối db: `book-model.js`

## 18/09:
* Kết nối sang user service lấy author data
* 