@256
D=A
@SP
M=D
@Sys.init$ret.1
D=A
@SP
M=D
@SP
M=M+1
@LCL
D=M
@SP
M=D
@SP
M=M+1
@ARG
D=M
@SP
M=D
@SP
M=M+1
@THIS
D=M
@SP
M=D
@SP
M=M+1
@THAT
D=M
@SP
M=D
@SP
M=M+1
@SP
D=A
@NaN
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.init
0;JMP
(Sys.init$ret.1)
// function SimpleFunction.test 2
(SimpleFunction.test)
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
A=M
D=A
@0
D=D+A
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
A=M
M=D
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
A=M
D=A
@1
D=D+A
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
A=M
M=D
// push local 0
@LCL
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 1
@LCL
A=M
D=A
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M+D
@SP
M=M+1
// not
@SP
M=M-1
A=M
D=M
M=!D
@SP
M=M+1
// push argument 0
@ARG
A=M
D=A
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M+D
@SP
M=M+1
// push argument 1
@ARG
A=M
D=A
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M-D
@SP
M=M+1
// return
// NOT IMPLEMENTED YET