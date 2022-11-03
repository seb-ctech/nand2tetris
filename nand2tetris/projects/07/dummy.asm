push constant 17
push constant 17
eq


@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@Dummy.Eq.3
D; JEQ
@SP
A=M
M=0
@Dummy.Eq.3.End
0; JMP
Dummy.Eq.3:
@SP
A=M
M=-1
Dummy.Eq.3.End:
@SP
M=M+1