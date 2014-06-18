<?php
// include("protected/config/db_settings.php"); 
class UserDB extends mysqli {

    // single instance of self shared among all instances
    private static $instance = null;


    // db connection config vars
    private $dbHost = 'localhost';
	private $dbUser = 'root';
	private $dbPass = 'AbC123';
	private $dbName = 'app_beyondwechattest';
    
    //This method must be static, and must return an instance of the object if the object
    //does not already exist.
    public static function getInstance() {
        if (!self::$instance instanceof self) {
            self::$instance = new self;
        }
        return self::$instance;
    }
    
    public function __clone() {
        trigger_error('Clone is not allowed.', E_USER_ERROR);
    }
    
    public function __wakeup() {
        trigger_error('Deserializing is not allowed.', E_USER_ERROR);
    }
    
    private function __construct() {
	    parent::__construct($this->dbHost, $this->dbUser, $this->dbPass, $this->dbName);
		//parent::__construct('localhost', 'root', 'AbC123', 'app_beyondwechattest');
        if (mysqli_connect_error()) {
            exit('Connect Error (' .mysqli_connect_errno(). ') '.mysqli_connect_error());
        }
        parent::set_charset('utf-8');
    }
    
    public function get_user_id_by_name($name) {
        $name = $this->real_escape_string($name);
        
        $user = $this->query("SELECT id FROM user_info WHERE nickname = '".$name."'");
        if ($user->num_rows > 0) {
            $row = $user->fetch_row();
            return $row[0];
        } else {
            return null;
        }
    }
    
    public function get_users_by_user_id($userID) {
        return $this->query("SELECT id, openId, nickname FROM user_info WHERE id = ". $userID);        
    }
	
	public function get_users() {        
        return $this->query("SELECT id, openId, nickname FROM user_info LIMIT 6");        
    }
	 
    public function create_user($name, $password) {
        $name = $this->real_escape_string($name);
        $password = $this->real_escape_string($password);
        $this->query("INSERT INTO user_info (name, password) VALUES ('".$name."', '".$password."')");
    }
    
    public function verify_user_credentials ($name, $password){
        $name = $this->real_escape_string($name);

        $password = $this->real_escape_string($password);
        $result = $this->query("SELECT 1 FROM user_info
                        WHERE name = '" . $name . "' AND password = '" . $password . "'");
        return $result->data_seek(0);
     }
     
     function insert_user($userID, $description, $duedate){
            $description = $this->real_escape_string($description);
            if ($this->format_date_for_sql($duedate)==null){
                $this->query("INSERT INTO user_score (user_id, description)" .
                     " VALUES (" . $userID . ", '" . $description . "')");
            } else
            $this->query("INSERT INTO user_score (user_id, description, due_date)" . 
                               " VALUES (" . $userID . ", '" . $description . "', " 
                               . $this->format_date_for_sql($duedate) . ")");
        }
        
        function format_date_for_sql($date){
            if ($date == "")
                return null;
            else {
                $dateParts = date_parse($date);
                return $dateParts["year"]*10000 + $dateParts["month"]*100 + $dateParts["day"];
           }

        }
}
?>