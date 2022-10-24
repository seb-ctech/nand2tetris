// RAM[2] = RAM[0] * RAM[1]


@R0
D=M

@a
M=D

@R1
D=M

@b
M=D

@R2
M=0

@i
M=0

(ADD_ONCE)

@END
D;JLE

@a
D=M

@R2
M=M+D

@b
M=M-1
D=M

@ADD_ONCE
0;JMP

(END)
@END
0;JMP
