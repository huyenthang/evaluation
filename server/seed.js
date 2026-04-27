require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Intern = require('./models/Intern');

const internsData = [
  { name: 'Đào Thị Thủy Trúc', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Hờ A Tỳ', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Khang Thị Già', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Lê Bích Ngọc', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Liêng Jrang Ha Khải', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Lồ A Thắng', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Lý Thị Si', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Mai Văn Minh', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Nguyễn Thị Thanh Nga', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Nguyễn Thị Thuỳ Linh', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Sùng A Sấu', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Sùng Văn Dầu', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Trần Văn Khánh', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Vàng A Thán', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Vũ Ngọc Nam', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Lò Thị Hoài', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Nguyễn Võ Minh Hoàng', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Giàng A Dũng', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Giàng Thị Dủa', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Lồ Thị Dâu', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Lý A Vềnh', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Ly Suy Sú', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Nguyễn Thị Thanh Huyền', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Sùng A Vả', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Sùng Thị Xi', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Sùng Tiến Trung', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Tạ Hoàng Thanh Thủy', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Thào Mý Chờ', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Trần Thị Kim Dung', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Trang A Sính', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Vũ Tiến Duy', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Y Huyên', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Lảo Thị Già', major: 'Bếp', gender: 'Nữ', department: 'BOH' },
  { name: 'Vàng A Mùa', major: 'F&B', gender: 'Nam', department: 'FOH' },
  { name: 'Giàng A Phong', major: 'Bếp', gender: 'Nam', department: 'BOH' },
  { name: 'Chu Thị De', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Phu Mè Gơ', major: 'F&B', gender: 'Nữ', department: 'FOH' },
  { name: 'Thào A Canh', major: 'F&B', gender: 'Nam', department: 'FOH' }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/internship_eval');
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Intern.deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      name: 'Admin School',
      department: 'ALL'
    });

    const managerPassword = await bcrypt.hash('manager123', 10);
    await User.create({
      username: 'manager',
      password: managerPassword,
      role: 'manager',
      name: 'Manager Hotel',
      department: 'ALL'
    });

    await User.create({
      username: 'manager_foh',
      password: managerPassword,
      role: 'manager',
      name: 'Manager FOH',
      department: 'FOH'
    });

    await User.create({
      username: 'manager_boh',
      password: managerPassword,
      role: 'manager',
      name: 'Manager BOH',
      department: 'BOH'
    });

    const interns = await Intern.insertMany(internsData.map(i => ({ ...i, batch: 'K46' })));
    
    console.log('Seed completed!');
    console.log(`Created ${interns.length} interns`);
    console.log('Admin account: admin / admin123');
    console.log('Manager accounts: manager / manager123, manager_foh / manager123, manager_boh / manager123');
    
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();