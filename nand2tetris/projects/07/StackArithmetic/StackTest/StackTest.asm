// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.EQ.2
D;JEQ
@SP
A=M
M=0
@StackTest.EQ.2.End
0;JMP
(StackTest.EQ.2)
@SP
A=M
M=-1
(StackTest.EQ.2.End)
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.EQ.5
D;JEQ
@SP
A=M
M=0
@StackTest.EQ.5.End
0;JMP
(StackTest.EQ.5)
@SP
A=M
M=-1
(StackTest.EQ.5.End)
@SP
M=M+1
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.EQ.8
D;JEQ
@SP
A=M
M=0
@StackTest.EQ.8.End
0;JMP
(StackTest.EQ.8)
@SP
A=M
M=-1
(StackTest.EQ.8.End)
@SP
M=M+1
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.LT.11
D;JLT
@SP
A=M
M=0
@StackTest.LT.11.End
0;JMP
(StackTest.LT.11)
@SP
A=M
M=-1
(StackTest.LT.11.End)
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.LT.14
D;JLT
@SP
A=M
M=0
@StackTest.LT.14.End
0;JMP
(StackTest.LT.14)
@SP
A=M
M=-1
(StackTest.LT.14.End)
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.LT.17
D;JLT
@SP
A=M
M=0
@StackTest.LT.17.End
0;JMP
(StackTest.LT.17)
@SP
A=M
M=-1
(StackTest.LT.17.End)
@SP
M=M+1
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.GT.20
D;JGT
@SP
A=M
M=0
@StackTest.GT.20.End
0;JMP
(StackTest.GT.20)
@SP
A=M
M=-1
(StackTest.GT.20.End)
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.GT.23
D;JGT
@SP
A=M
M=0
@StackTest.GT.23.End
0;JMP
(StackTest.GT.23)
@SP
A=M
M=-1
(StackTest.GT.23.End)
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@StackTest.GT.26
D;JGT
@SP
A=M
M=0
@StackTest.GT.26.End
0;JMP
(StackTest.GT.26)
@SP
A=M
M=-1
(StackTest.GT.26.End)
@SP
M=M+1
// push constant 57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 53
@53
D=A
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
// push constant 112
@112
D=A
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
// neg
@SP
M=M-1
A=M
D=M
M=-D
@SP
M=M+1
// and
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M&D
@SP
M=M+1
// push constant 82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1
// or
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
M=M|D
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