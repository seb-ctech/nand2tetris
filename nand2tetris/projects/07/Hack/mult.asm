// RAM[2] = RAM[0] * RAM[1]


@R0
D=M

@a
M=D

@R1
D=M

@b
M=D

@i
M=0

(ADD_ONCE)
@a
D=M

@R2
M=M+D

@b
M=M-1
D=M

@END
D;JEQ
@ADD_ONCE
0;JMP

(END)
@END
0;JMP
