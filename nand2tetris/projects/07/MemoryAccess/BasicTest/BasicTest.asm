// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 0
@LCL
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
// push constant 21
@21
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 22
@22
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop argument 2
@ARG
D=A
@2
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
// pop argument 1
@ARG
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
// push constant 36
@36
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop this 6
@THIS
D=A
@6
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
// push constant 42
@42
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 45
@45
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop that 5
@THAT
D=A
@5
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
// pop that 2
@THAT
D=A
@2
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
// push constant 510
@510
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop temp 6
@undefined
D=A
@6
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
D=A
@0
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// push that 5
@THAT
D=A
@5
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// add
NOPE
// push argument 1
@ARG
D=A
@1
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// sub
NOPE
// push this 6
@THIS
D=A
@6
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// push this 6
@THIS
D=A
@6
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// add
NOPE
// sub
NOPE
// push temp 6
@undefined
D=A
@6
A=D+A
@SP
A=M
M=D
@SP
M=M+1
// add
NOPE