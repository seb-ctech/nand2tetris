@256
D=A
@SP
M=D
// NOT IMPLEMENTED YET
// push constant 0    
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 0         
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
// label LOOP_START
(LOOP_START)
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
// pop local 0	        
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
// push constant 1
@1
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
// pop argument 0      
@ARG
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
// if-goto LOOP_START  
@SP
M=M-1
A=M
D=M
@LOOP_START
D;JNE
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