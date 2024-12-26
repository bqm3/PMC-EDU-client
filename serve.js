import serve from 'serve';

const options = {
  port: 6666,
  directory: './build', // Thư mục build của React
};

serve(options);
